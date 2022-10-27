# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  before_action :check_password_presence, only: [:index]

  def index
    @public_categories = Category.split_category_articles_based_on_status
  end
end
