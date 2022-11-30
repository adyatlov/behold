import { Command, Flags } from '@oclif/core'
import { createWriteStream, existsSync, fstat, readdirSync, readFileSync } from 'fs'
import * as klawSync from 'klaw-sync'
import * as pathParse from 'path-parse'
import { format } from '@fast-csv/format'
import path = require('path')
import { throws } from 'assert'
import { Item } from 'klaw'


export default class Csv extends Command {
  static description = 'represents kubernetes objects in CSV format.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    dir: Flags.string({
      char: 'd',
      description: 'directory with the diagnostics bundle',
      default: './',
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Csv)
    const dir = path.resolve(flags.dir);
    if (!existsSync(dir)) {
      this.error(`Directory ${dir} does not exist`)
      process.exit(-1)
    }
    this.log(`Parsing files from ${dir}`)
    this.parsePods(dir)
  }

  private parsePods(dir: string) {
    const podsDir = path.join(dir, 'cluster-resources/pods')
    if (!existsSync(podsDir)) {
      this.error(`Pods directory does not exist: ${podsDir}`)
    }
    this.log(`Parsing pods directory ${podsDir}`)
    const pods = klawSync(podsDir, {
      depthLimit: 1,
      filter: (item: Item): boolean => {
        if (item.stats.isFile() && pathParse(item.path).ext === '.json') {
          return true
        }
        return false
      }
    })
    const ws = createWriteStream("pods.csv");
    const csvStream = format(
      {
        headers: [
          'Name',
          'Phase',
          'Namespace',
          'Node Name',
          'Restart Count',
          'Host IP',
          'Pod IP',
        ]
      }
    );
    csvStream.pipe(ws)
      .on("error", (error) => {
        this.error(`Error when writing to pods CSV: ${error}`);
        process.exit(-1)
      })
    pods.forEach(podsFile => {
      let rawdata = readFileSync(podsFile.path).toString()
      let pods: any;
      try {
        pods = JSON.parse(rawdata)
      } catch (error) {
        this.warn(`Cannot parse ${podsFile.path}: ${error}`)
        return;
      }
      if (pods.items) {
        pods = pods.items
      }
      pods.forEach((pod: any) => {
        pod.status.containerStatuses.forEach((containerStatus: any) => {
          csvStream.write([
            pod.metadata.name,
            pod.status.phase,
            pod.metadata.namespace,
            pod.spec.nodeName,
            containerStatus.restartCount,
            pod.status.hostIP,
            pod.status.podIP,
          ])
        });
      });
    })
    csvStream.end();
    this.log(`Find pods information in the file ${path.resolve('pods.csv')}`);
  }
}