import { DefaultTable } from '@/types'
import { getRandomElementArray } from '@/helpers/getRandomElement'

const regex = /\n|\r/g

export const removeBreaklineAndSpace = (text: string) => {
  return text.replace(regex, '')
}

export const getMainIFrameContent = ({
  defaultTable,
  hasCredentials
}: {
  defaultTable: DefaultTable | undefined
  hasCredentials: boolean
}) => {
  let tableName = 'YOUR_TABLE'
  let exampleInsert: Record<string, any> = { id: 1 }
  let randomColumn = 'id'

  if (defaultTable) {
    tableName = defaultTable.table
    exampleInsert = defaultTable?.properties
      .slice(0, 2)
      .reduce((acum: Record<string, any>, property) => {
        acum[property] = 'data'
        return acum
      }, {})
    randomColumn = getRandomElementArray(defaultTable.properties!)
  }

  return `<main style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
  <div style="font-family: sans-serif; height:100%; width:100%;">
    <div style="display: flex; flex-direction: column;margin-bottom: 20px;">
      <h2 style="color: rgb(74 222 128);font-size: 1.5rem;line-height: 2rem;margin: 0;margin-bottom: 16px;">
        Settings
      </h2>
      ${
        !hasCredentials
          ? '<p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">Start setting your Supabase API Keys on &#9881</span> Settings.</p>'
          : ''
      }
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">
        You can update your credentials at any time by clicking on the Settings button.
      </p>
    </div>
    <div style="display: flex; flex-direction: column; margin-bottom: 20px;">
      <h2 style="color: rgb(74 222 128);font-size: 1.5rem;line-height: 2rem;margin: 0;margin-bottom: 16px;">
        Usage
      </h2>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">
        You can perform the same queries against your PostgreSQL database, as mentioned in the
        Supabase
        <a target="_blank" href="https://supabase.com/docs/reference/javascript/" style="color: rgb(74 222 128);">documentation.</a>
      </p>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">
        You only need to return a promise as you will see in the examples section.
      </p>
    </div>
    <div style="display: flex; flex-direction: column;margin-bottom: 20px;">
      <h2 style="color: rgb(74 222 128);font-size: 1.5rem;line-height: 2rem;margin: 0;margin-bottom: 16px;">
        Examples
      </h2>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a SELECT query on the table <b>${tableName}</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;">
          return await supabase.from("${tableName}").select()
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a INSERT into the table <b>${tableName}</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;">
          return await supabase.from("${tableName}").insert(${JSON.stringify(exampleInsert)})
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a DELETE on the table <b>${tableName}</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;">
          return await supabase.from("${tableName}").delete().eq("${randomColumn}", "value")
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Match only rows where <b>${randomColumn}</b> is greater than or equal to value:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;"
          >return await supabase.from("${tableName}").select().gte("${randomColumn}", "value")
        </code>
      </div>
    </div>
  </div></main>`
}
