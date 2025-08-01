import { getSnapshot, IAnyModelType, Instance, types } from "mobx-state-tree"
var FormData = require("form-data")
// var fs = require('fs');
export enum REQUEST_METHOD {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
}
export const BaseModelSchemaBase = {
    id: types.identifier,
    // created_on: types.timestamp,
    // edited_on: types.Date,
    // edited_on: types.Date,
    // _data: types.maybeNull(types.frozen()), //will need to test this heavily
}
export const PaginatedSchemaBase = {
    count: types.number,
    next: types.maybeNull(types.string),
    previous: types.maybeNull(types.string),
}
export const FAQSchemaBase = {
    count: types.number,
    next: types.maybeNull(types.string),
    previous: types.maybeNull(types.string),
}
export const PAGINATION_FILTERS = {
    PAGE_NUMBER: "page",
    PAGE_SIZE: "page_size",
    DISABLE_PAGINATION: "all_pages",
}
export const ACTION_RESPONSES = {
    success: { ok: true, error: null, code: null, message: null },
    failure: { ok: false, error: null, code: null, message: null },
}
export const ORDERING_FILTER = "ordering"
export const SEARCH_FILTER = "search"
export const UTILS = {
    getPageNumber(url_string: string) {
        if (url_string) {
            let url = new URL(url_string)
            let page_number = url.searchParams.get(PAGINATION_FILTERS.PAGE_NUMBER)
            if (page_number) return parseInt(page_number)
            return 1
        } else {
            return 1
        }
    },
    getSubdomain(url_string: string) {
        if (url_string) {
            let url = new URL(url_string)
            if (url.hostname.includes("www")) {
                return url.hostname.split(".")[1]
            }
            return url.hostname.split(".")[0]
        } else {
            return null
        }
    },
    getCurrentHttpPrefix() {
        return
    },
    injectSubdomain(subdomain: string, url: string) {
        const http_prefix = window.location.href.split(":")[0] + "://"
        const baseURL = new URL(url)
        if (baseURL.host.includes("www")) {
            subdomain = baseURL.host.replace("www", subdomain)
        } else {
            subdomain += "." + baseURL.host
        }
        return http_prefix + subdomain
    },
    packFormData(data: Record<string, any>): FormData {
        let formData = new FormData()
        for (const field in data) {
            formData.append(field, data[field])
        }
        return formData
    },
}
export const TRAILING_SLASH = "/"
export class API_ENDPOINT {
    url: string="" //the url
    method: REQUEST_METHOD=REQUEST_METHOD.GET //the request method
    response: any //the expected response in JSON
    transformer: Function | null=null //transforming the response if needed
    data_fields: Array<string>=[] //expected list of fields in PATCH and POST request data
    public constructor(init?: Partial<API_ENDPOINT>) {
        const required_fields = ["url", "method", "response", "transformer"]
        var missing_fields:Array<any> = []
        if(init)
        required_fields.forEach((field) => {
            field in init ? null : missing_fields.push(field)
        })
        else{
            throw "You must provide argument"
        }
        if (missing_fields.length > 0) {
            console.error(
                missing_fields.toString(),
                "are required fields for API Endpoint, currently you have",
                Object.keys(init).toString(),
            )
        }
        if (init.data_fields == null) {
            init.data_fields = []
        }
        Object.assign(this, init)
    }
}
export type API_SCHEMA = typeof API_ENDPOINT

// function transformJsonFromModel(json: object, model: IAnyModelType) {
//     return console.error("ROLLED BACK")
//     for (const field in json) {
//         switch (model[field]) {
//             case types.Date:
//                 json[field] = new Date(json[field])
//                 break
//             case types.integer:
//                 json[field] = parseInt(json[field])
//                 break
//             case types.number:
//             case types.identifierNumber:
//                 console.log("OOOOOOOOOOOOOOOOOOOOOOO")
//                 json[field] = parseFloat(json[field])
//                 break
//             case types.boolean:
//                 json[field] = Boolean(json[field])
//                 break
//             case types.model:
//                 json[field] = transformJsonFromModel(json[field], model[field])
//                 break
//             case types.array:
//                 console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//                 console.log(model[field])
//                 // json[field].map(
//                 //   (x)=>(transformJsonFromModel(x,model[field]))
//                 // )
//                 break
//             case types.maybeNull:
//                 console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNN")
//                 console.log(model[field])
//                 break
//             case types.optional:
//                 console.log("OPTIONALOPTIONALOPTIONALOPTIONAL")
//                 console.log(model[field])
//                 break
//             case types.union:
//                 console.log("UNIONUNIONUNIONUNIONUNIONUNIONUNIONUNIONUNION")
//                 console.log(model[field])
//                 break
//             default:
//                 console.log("not handled")
//                 console.log(model[field])
//                 break
//         }
//     }
//     return json
// }
// export function transformObjectFromSchema(data: any, schema: IAnyModelType) {
//     return console.error("ROLLED BACK")
//     if (!schema) {
//         console.warn("You haven't defined a schema for this object:", data)
//         return data
//     }
//     console.log("types-----------")
//     console.log(types)
//     console.log(schema.properties)
//     console.log("==================")
//     return transformJsonFromModel(data, schema.properties)
// }
// export const generatedPaginatedActions = <Type>(model: IAnyModelType) => {
//     return console.error("ROLLED BACK")
//     interface ArrayType extends Instance<Array<Type>> { }
//     return (self: any) => ({
//         _replace(values: ArrayType): ArrayType {
//             self.results.clear()
//             self.results.replace(values)
//             return self.results
//         },
//         _append(values: ArrayType): ArrayType {
//             self.results.replace(self.results.concat(values))
//             return self.results
//         },
//         _clear(): void {
//             self.results.clear()
//         },
//         _findIndex(searchObject: Partial<Type>): number {
//             if (Object.keys(searchObject).length == 0) {
//                 console.error("You didn't specify any valid search keys")
//                 return -1
//             }
//             return self.results.findIndex((obj: any) => {
//                 let match = false
//                 Object.keys(searchObject).forEach((key) => {
//                     match = obj[key] == searchObject[key]
//                 })
//                 return match
//             })
//         },
//         _editObjectAtIndex(index: number, editObject: Partial<Type>) {
//             self.results[index] = model.create({
//                 ...getSnapshot(self.results[index]),
//                 ...editObject,
//             })
//         },
//     })
// }
// export const generalEndpointSchemaTest =async (endpoints:Record<string,API_ENDPOINT>)=>{

//  return true
// }
