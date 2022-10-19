# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  before_action :check_password_presence, only: [:index]

  def index
    categories = Category.split_category_articles_based_on_status
    render json: { categories: categories }
  end
end
