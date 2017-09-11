defmodule ClioWeb.AdministrativeResolver do
  alias Clio.Administrative

  def faculties(_root, _args, _info) do
    {:ok, Administrative.list_faculties()}
  end
end
