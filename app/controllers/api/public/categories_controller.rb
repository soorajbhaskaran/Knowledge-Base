# frozen_string_literal: true

class API::Public::CategoriesController < ApplicationController
  before_action :check_password_presence, :load_categories, only: [:index]

  def index
    @categories = @categories.order(:position).show_category_with_published_articles
  end

  private

    def load_categories
      @categories = Category.where(author: current_organization.users)
    end
end
