const regex = /\n|\r/g

export const removeBreaklineAndSpace = (text: string) => {
  return text.replace(regex, '')
}

export const getMainIFrameContent = () => {
  return `<main style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"><div style="font-family: sans-serif; padding: 20px;">
    <div style="display: flex; flex-direction: column; margin-bottom: 32px;">
      <h1 style="color: rgb(74 222 128);font-size: 2.25rem;line-height: 2.5rem;margin: 0;margin-bottom: 16px;">
        SupaPlay
      </h1>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">
        A playground to test and refine your <b>supabase-js</b> JavaScript functions against your
        PostgreSQL database.
      </p>
      <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;line-height: 1.75rem;margin: 0;">
        Say goodbye to installations, and start testing your code instantly.
      </p>
    </div>
    <div style="display: flex; flex-direction: column; margin-bottom: 32px;">
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
    <div style="display: flex; flex-direction: column;">
      <h2 style="color: rgb(74 222 128);font-size: 1.5rem;line-height: 2rem;margin: 0;margin-bottom: 16px;">
        Examples
      </h2>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a SELECT query on the table <b>comments</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 20px;">
          return await supabase.from("comments").select()
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a INSERT into the table <b>comments</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 20px;">
          return await supabase.from("comments").insert({ user: "xavi" })
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 22px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Perform a DELETE on the table <b>comments</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 20px;">
          return await supabase.from("comments").delete().eq("id", 1)
        </code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
        <p style="color: rgba(255, 255, 255, 0.6);font-size: 1rem;margin: 0;margin-bottom: 10px;">
          Match only rows where <b>id</b> is greater than or equal to value <b>2</b>:
        </p>
        <code style="background-color: rgba(0, 0, 0, 0.2);color: rgba(255, 255, 255, 0.5);font-size: 1rem;border: 1px solid rgba(255, 255, 255, 0.1);border-radius: 6px;padding: 10px;margin: 0;height: 20px;"
          >return await supabase.from("comments").select().gte("id", 2)
        </code>
      </div>
    </div>
  </div></main>`
}
