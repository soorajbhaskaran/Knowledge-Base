# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
  end

  private

    def category_params
      params.require(:category).permit(:title)
    end
end
