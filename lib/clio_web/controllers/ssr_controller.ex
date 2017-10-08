defmodule ClioWeb.SsrController do
  use ClioWeb, :controller

  def index(%{private: %{ssr: %{user: user}}} = conn, _params) do
    result =  HTTPoison.post!(
      create_query(conn),
      encode_user(%{user: user}),
      {"Content-Type","application/json"}
    )

    html(conn, result.body)
  end

  defp create_query(conn) do
    "http://localhost:3003/" <> Enum.join(conn.path_info, "/") <> construct_query(conn.query_string)
  end

  defp construct_query(<<>>), do: <<>>
  defp construct_query(query_string), do: "?" <> query_string

  defp encode_user(%{} = map) do
    map
    |> Enum.map(fn {key, value} -> {key |> Atom.to_string |> Inflex.camelize(:lower) , value} end)
    |> Map.new()
    |> Poison.encode!()
  end
end
