defmodule ClioWeb.Context do
  @behaviour Plug

  import Plug.Conn

  @cookie_ttl 60*10

  def init(opts), do: opts

  def call(%{cookies: %{"user" => user}} = conn, scope) when scope in [:gql, :ssr] do
    user_map = decode_user(user)
    conn
    |> add_context_to_scope(user_map, scope)
    |> put_resp_cookie("user", user, max_age: @cookie_ttl)
  end

  def call(conn, :gql) do
    id = ConCache.isolated(:request_flow, :id, &get_next_id/0)
    ConCache.dirty_put(:request_flow, id, nil)
    conn
    |> put_private(:absinthe, %{context: %{req_id: id}})
    |> register_before_send(&put_cookie_if_auth/1)
  end

  def call(conn, :ssr) do
    put_private(conn, :ssr, %{user: %{}})
  end

  defp get_next_id() do
    ConCache.dirty_update(:request_flow, :id, fn id -> {:ok, id + 1} end)
    ConCache.get(:request_flow, :id)
  end

  defp put_cookie_if_auth(%{private: %{absinthe: %{context: %{req_id: id}}}} = conn) do
    case ConCache.get(:request_flow, id) do
      nil ->
        conn
      user ->
        conn
        |> put_resp_cookie("user", encode_user(user), max_age: @cookie_ttl)
    end
  end

  defp encode_user(user) do
    user
    |> Map.take([:id, :is_supervisor, :is_admin, :is_active, :first_name, :last_name])
    |> :erlang.term_to_binary()
    |> Base.encode64
  end

  defp decode_user(user) do
    user
    |> Base.decode64!
    |> :erlang.binary_to_term
  end

  defp add_context_to_scope(conn, user, :gql) do
    put_private(conn, :absinthe, %{context: %{user: user}})
  end

  defp add_context_to_scope(conn, user, :ssr) do
    put_private(conn, :ssr, %{user: user})
  end
end
