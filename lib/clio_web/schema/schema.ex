defmodule ClioWeb.Schema do
  use Absinthe.Schema
  import_types ClioWeb.Schema.Types
  import_types Absinthe.Type.Custom

  alias ClioWeb.{AdministrativeResolver,
                 AccountsResolver}

  query do
    field :faculties, list_of(:faculty) do
      resolve &AdministrativeResolver.faculties/3
    end

    field :user, :user do
      arg :id, non_null(:id)
      resolve &AccountsResolver.user/3
    end

    field :users, list_of(:user) do
      resolve &AccountsResolver.users/3
    end
  end

  mutation do
    field :update_user, :user do
      arg :id, non_null(:id)
      arg :is_admin, :boolean
      arg :is_supervisor, :boolean
      resolve &AccountsResolver.update_user/3
    end
  end
end
