defmodule ClioWeb.Router do
  use ClioWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :token do
    plug :fetch_cookies
    plug ClioWeb.Context
  end

  scope "/account", ClioWeb do
    pipe_through [:api, :token]

    forward "/", AccountRouter
  end

  scope "/clio", ClioWeb do
    pipe_through [:token]

    get "/*path", PageController, :index
  end

  scope "/gql" do
    pipe_through [:api, :token]

    forward "/", Absinthe.Plug, schema: ClioWeb.Schema
  end

  scope "/graphiql" do
    pipe_through :api

    forward "/", Absinthe.Plug.GraphiQL,
      schema: ClioWeb.Schema,
      context: %{pubsub: ClioWeb.Endpoint}
  end
end
