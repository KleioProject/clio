defmodule ClioWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(%{cookies: %{"token" => token}} = conn, context) when context in [:gql, :clio] do
    {:ok, user} = Phoenix.Token.verify(ClioWeb.Endpoint, "The salt bro", token)
    put_private(conn, :absinthe, %{context: %{current_user: user}})
  end

  def call(conn, :gql) do
    case conn |> get_req_header("authorization") |> fetch_bearer() do
      nil ->
        conn
      token ->
        {:ok, user} = Phoenix.Token.verify(ClioWeb.Endpoint, "The salt bro", token)
        put_private(conn, :absinthe, %{context: %{current_user: user}})
    end
  end

  def call(conn, _), do: conn

  defp fetch_bearer(auth) when is_binary(auth) do
    auth
    |> String.split(",")
    |> Enum.map(&trim_bearer/1)
    |> Enum.drop_while(fn x -> not x end)
    |> hd()
    |> String.trim()
  end

  defp trim_bearer(<<"Bearer ", rest::binary>>), do: rest
  defp trim_bearer(_), do: nil
end
