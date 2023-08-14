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

  const htmlNoCredentials = !hasCredentials
    ? `You have not set up your Supabase Keys yet. To proceed, go to <b>Settings</b> and fill out your Keys. Once finished, close the modal and start querying.`
    : 'Your credentials have been configured successfully.'

  return `<main style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
  <div style="font-family: sans-serif; height:100%; width:100%;">
    <div style="display: flex; flex-direction: column;margin-bottom: 20px;">
      <h1 style="color: rgb(74 222 128);font-size: 1.8rem;margin: 0;margin-bottom: 16px;">
        Supaplay
      </h1>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;line-height: 1.75rem;margin: 0;">
        ${htmlNoCredentials}
      </p>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;line-height: 1.75rem;margin: 0;">
        Remember, your credentials are saved in localStorage.
      </p>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;line-height: 1.75rem;margin: 0;">
        Perform the same queries as mentioned in the
        <a target="_blank" href="https://supabase.com/docs/reference/javascript/" style="color: rgb(74 222 128);">
          Supabase documentation.
        </a>
        Simply ensure that you return a promise within the wrapper function.
      </p>
    </div>
    <div style="display: flex; flex-direction: column;margin-bottom: 20px;">
      <h2 style="color: rgb(74 222 128);font-size: 1.8rem;margin: 0;margin-bottom: 16px;">
        Examples
      </h2>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;margin: 0;margin-bottom: 10px;">
          Perform a SELECT query on the table <b>${tableName}</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 0.9rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;">
          return await supabase.from("${tableName}").select()
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;margin: 0;margin-bottom: 10px;">
          Perform a INSERT into the table <b>${tableName}</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 0.9rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;">
          return await supabase.from("${tableName}").insert(${JSON.stringify(exampleInsert)})
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1.10rem;margin: 0;margin-bottom: 10px;">
          Match only rows where <b>${randomColumn}</b> is greater than or equal to value:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 0.9rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 100%;"
          >return await supabase.from("${tableName}").select().gte("${randomColumn}", "value")
        </code>
      </div>
    </div>
  </div></main>`
}
