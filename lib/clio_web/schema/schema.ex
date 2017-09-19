defmodule ClioWeb.Schema do
  use Absinthe.Schema
  import_types ClioWeb.Schema.Types
  import_types Absinthe.Type.Custom

  alias Clio.{Accounts,
              Administrative}

  query do
    field :faculties, list_of(:faculty) do
      resolve &Administrative.Resolver.faculties/3
    end

    field :user, :user do
      arg :id, non_null(:id)
      resolve &Accounts.Resolver.user/3
    end

    field :users, list_of(:user) do
      resolve &Accounts.Resolver.users/3
    end

    field :search_users, list_of(:user) do
      arg :search_term, non_null(:string)
      resolve &Accounts.Resolver.search_users/3
    end
  end

  mutation do
    field :update_user, :user do
      arg :id, non_null(:id)
      arg :is_admin, :boolean
      arg :is_supervisor, :boolean
      resolve &Accounts.Resolver.update_user/3
    end
  end
end
