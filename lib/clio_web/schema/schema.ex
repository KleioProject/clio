defmodule ClioWeb.Schema do
  use Absinthe.Schema
  import_types ClioWeb.Schema.Types
  import_types Absinthe.Type.Custom

  query do
    # Fields go here
  end
end
