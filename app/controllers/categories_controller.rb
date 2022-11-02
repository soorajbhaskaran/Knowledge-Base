# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    @categories = current_user.categories.order(:position).split_category_articles_based_on_status
    params[:status] == "published" && @categories = @categories.map { |category|
    category.merge(articles_count: category[:articles][:published].count) }
    params[:status] == "draft" && @categories = @categories.map { |category|
    category.merge(articles_count: category[:articles][:draft].count) }
  end

  def create
    category = current_user.categories.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    @category.articles_count.zero? ? @category.destroy! : change_article_category
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def sort
    params[:categories].each_with_index do |category, index|
      current_user.categories.where(id: category[:id]).update_all(position: index + 1)
    end
  end

  def search
    params[:query].blank? ? index : search_categories
  end

  private

    def load_category!
      @category = current_user.categories.find_by!(id: params[:id])
    end

    def change_article_category
      new_category_id = create_new_category_if_there_is_only_one
      @category.articles.update_all(category_id: new_category_id)
      Category.update_counters(new_category_id, articles_count: @category.articles_count)
      # current_user.categories.reset_counters(new_category_id, :articles)
      @category.reload.destroy!
    end

    def create_new_category_if_there_is_only_one
      if current_user.categories.count == 1
        current_user.categories.create!(title: "General")
        return current_user.categories.where(title: "General").first.id
      end
      params[:new_category_id]
    end

    def category_params
      params.require(:category).permit(:title)
    end

    def search_categories
      @categories = current_user.categories.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
    end
end
