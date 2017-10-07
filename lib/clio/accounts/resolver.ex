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

  def search_users(_root, %{search_term: search_term} = args, _info) do
    {:ok, Accounts.search_users(search_term)}
  end

  def login_user(_root, %{email: email, password: _} = args, _info) do
    try do
      {:ok, Accounts.get_user_by_email!(email)}
    rescue
      _ ->
        {:error, %{message: "LaLa Land", error_code: 123}}
    end
  end
end
