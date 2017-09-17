defmodule Clio.Administrative.Resolver do
  alias Clio.Administrative

  def faculties(_root, _args, info) do
    IO.inspect info.context
    {:ok, Administrative.list_faculties()}
  end
end
