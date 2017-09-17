defmodule ClioWeb.AccountRouter do
  use ClioWeb, :router

  scope "/login", ClioWeb do
    post "/", AccountControler, :login
  end
end
