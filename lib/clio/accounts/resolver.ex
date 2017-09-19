defmodule Clio.Accounts.Resolver do
  alias Clio.Accounts

  def user(_root, %{id: id}, _info) do
    try do
      {:ok, Accounts.get_user!(id)}
    rescue
      _ ->
        {:error, %{message: "LaLa Land", error_code: 123}}
    end
  end

  def users(_root, _args, _info) do
    {:ok, Accounts.list_users()}
  end

  def update_user(_root, %{id: id} = args, _info) do
    try do
      id
      |> Accounts.get_user!()
      |> Accounts.update_user(args)
    rescue
      _ ->
        {:error, "0xBADDFOOD"}
    end
  end

  def search_users(_root, %{search_term: search_term} = args, _info) do
    {:ok, Accounts.search_users(search_term)}
  end
end
