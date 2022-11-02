# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  before_action :check_password_presence, only: [:index]

  def index
    @public_categories = Category.show_category_with_published_articles
  end
end
