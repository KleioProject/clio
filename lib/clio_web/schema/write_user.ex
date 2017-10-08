defmodule ClioWeb.Schema.UserAuthenticated do
  @behaviour Absinthe.Middleware

  def call(%{value: user, context: %{req_id: id}} = resp, _info) do
    ConCache.dirty_update(:request_flow, id, fn _ -> {:ok, take_only_needed(user)} end)
    resp
  end

  def call(resp, _), do: resp

  defp take_only_needed(user) do
    Map.take(user, [:id, :is_supervisor, :is_admin, :is_active, :first_name, :last_name])
  end
end
