# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:new, :create, :show, :index]
  resources :articles, only: [:index, :create], defaults: { format: "json" }, param: :slug
  resources :categories, only: [:index, :create], defaults: { format: "json" }

  root "home#index"
  get "*path", to: "home#index", via: :all
end
