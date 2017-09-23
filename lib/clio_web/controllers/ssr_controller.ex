defmodule ClioWeb.SsrController do
  use ClioWeb, :controller

  def index(conn, _params) do
    result =  HTTPoison.post!(create_query(conn), "{}")
    conn
    |> html(result.body)
  end

  defp create_query(conn) do
    "http://localhost:3003/" <> Enum.join(conn.path_info, "/") <> construct_query(conn.query_string)
  end

  defp construct_query(<<>>), do: <<>>
  defp construct_query(query_string), do: "?" <> query_string
end
