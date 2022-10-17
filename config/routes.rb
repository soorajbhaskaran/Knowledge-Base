# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:new, :create, :show, :index]
  resources :articles, only: [:index, :create, :show, :destroy, :update], defaults: { format: "json" }, param: :slug
  resources :categories, only: [:index, :create, :update, :destroy], defaults: { format: "json" }
  resources :redirections, only: [:index, :create, :update, :destroy], defaults: { format: "json" }
  resource :preference, only: [:show, :update, :create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
