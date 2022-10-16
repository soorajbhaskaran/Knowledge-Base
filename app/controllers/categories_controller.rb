# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    categories = Category.split_category_articles_based_on_status
    render json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    puts @category.articles_count
    @category.articles_count.zero? ? @category.destroy! : change_article_category
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  private

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def change_article_category
      new_category_id = create_new_category_if_there_is_only_one
      @category.articles.update_all(category_id: new_category_id)
      Category.update_counters(new_category_id, articles_count: Category.find_by!(id: new_category_id).articles.count)
      @category.destroy!
    end

    def create_new_category_if_there_is_only_one
      if Category.count == 1
        Category.create!(title: "General")
        return Category.first.id
      end
      params[:new_category_id]
    end

    def category_params
      params.require(:category).permit(:title)
    end
end
