defmodule Clio.Repo.Migrations.UserSearchIndex do
  use Ecto.Migration
  def change do
    alter table(:users) do
      add :search_name, :text, null: false
    end

      execute "CREATE extension if not exists pg_trgm"
      execute(
        "CREATE INDEX users_search_trgm_index ON users USING gin (search_name gin_trgm_ops)",
        "DROP INDEX users_search_trgm_index"
      )
  end
end
