defmodule ClioWeb.Router do
  use ClioWeb, :router

  pipeline :browser do
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :acc_json do
    plug :accepts, ["json"]
  end

  pipeline :clio do
    plug :accepts, ["html"]
    plug :fetch_cookies
    plug ClioWeb.Context, :clio
  end

  pipeline :gql do
    plug :accepts, ["json"]
    plug :fetch_cookies
    plug ClioWeb.Context, :gql
  end

  pipeline :redirect_to_index do
    plug :redirect, to: "/clio"
  end

  scope "/account", ClioWeb do
    pipe_through :acc_json

    forward "/", AccountRouter
  end

  scope "/clio", ClioWeb do
    pipe_through :clio

    get "/*any", SsrController, :index
  end

  scope "/gql" do
    pipe_through :gql

    forward "/", Absinthe.Plug, schema: ClioWeb.Schema
  end

  scope "/graphiql" do
    pipe_through :gql

    forward "/",
      Absinthe.Plug.GraphiQL,
      schema: ClioWeb.Schema,
      context: %{pubsub: ClioWeb.Endpoint}
  end

  scope "/", ClioWeb do
    match(:*, "/*any" , RedirectController, :redirect_to_index)
  end
end
