import fs from 'fs'
import {parse} from 'csv-parse'

export class DataProvider
{
    static gettestdatafromjson(filepath:string)
    {
        let data:any = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
        return data
    }

    static gettestdatafromcsv(filepath:string)
    {
        let csvdata = parse(fs.readFileSync(filepath), {columns:true, skip_empty_lines:true})
        return csvdata
    }
}
 