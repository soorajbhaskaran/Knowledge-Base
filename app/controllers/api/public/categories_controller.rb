# frozen_string_literal: true

class API::Public::CategoriesController < ApplicationController
  before_action :check_password_presence, only: [:index]

  def index
    @categories = Category.order(:position).show_category_with_published_articles
  end
end
