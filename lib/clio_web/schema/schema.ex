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

  # TODO|>RED move function away

  mutation do
    field :login, :viewer do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Accounts.Resolver.login_user/3

      middleware (
        fn
          %{value: user, context: %{req_id: id}} = res, _info ->
            if user, do: ConCache.dirty_update(:request_flow, id, fn _ -> {:ok, user} end)
            res
          res, _ ->
            res
        end
      )
    end

    field :register, :viewer do
      arg :contact_email, non_null(:string)
      arg :contact_number, non_null(:string)
      arg :first_name, non_null(:string)
      arg :last_name, non_null(:string)
      arg :faculty_id, non_null(:id)
      arg :id_number, non_null(:string)
      arg :login_email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Accounts.Resolver.register_user/3

      middleware (
        fn
          %{value: user, context: %{req_id: id}} = res, _info ->
            if user, do: ConCache.dirty_update(:request_flow, id, fn _ -> {:ok, user} end)
            res
          res, _ ->
            res
        end
      )
    end
  end
end
