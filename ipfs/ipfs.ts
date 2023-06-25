import { IPFS, create } from 'ipfs-core'
import type { CID } from 'multiformats/cid'


export const  writeFile = async (fileName:string,fileContent:string):Promise<string> => {
    const node = await create({}) //TODO ipfs should move to testnet
    const version = await node.version()

    console.log('Version:', version.version)

    const file = await node.add({
        path: fileName,
        content: new TextEncoder().encode(fileContent)
    })

    console.log('Added file:', file.path, file.cid.toString())
    try {
        return file.cid.toString()
    } catch (error) {
        console.error(error);
        return ""
    }
}

const readFile = async (cid: CID): Promise<string> => {
    const node = await create()
    const decoder = new TextDecoder()
    let content = ''

    for await (const chunk of node.cat(cid)) {
        content += decoder.decode(chunk, {
            stream: true
        })
    }

    return content
}