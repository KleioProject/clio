defmodule ClioWeb.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Clio.Repo

  object :faculty do
    field :id, non_null(:id)
    field :abbreviation, non_null(:string)
    field :name, non_null(:string)
  end

  object :user do
    field :id, non_null(:id)
    field :contact_email, non_null(:string)
    field :contact_number, non_null(:string)
    field :first_name, non_null(:string)
    field :faculty, :faculty, resolve: assoc(:faculty)
    field :id_number, non_null(:string)
    field :is_active, non_null(:boolean)
    field :is_admin, non_null(:boolean)
    field :is_supervisor, non_null(:boolean)
    field :last_name, non_null(:string)
    field :login_email, non_null(:string)
    field :search_name, non_null(:string)
  end
end
