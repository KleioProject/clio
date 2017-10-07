defmodule ClioWeb.Router do
  use ClioWeb, :router

  pipeline :ssr do
    plug :accepts, ["html"]
    plug :fetch_cookies
    plug ClioWeb.Context, :ssr
  end

  pipeline :gql do
    plug :accepts, ["json"]
    plug :fetch_cookies
    plug ClioWeb.Context, :gql
  end

  scope "/clio", ClioWeb do
    pipe_through :ssr

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

  # scope "/", ClioWeb do
  #   pipe_through :ssr

  #   match(:*, "/*any" , RedirectController, :redirect_to_index)
  # end
end
