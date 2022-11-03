# frozen_string_literal: true

class API::CategoriesController < ApplicationController
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
    @category.articles_count.zero? ? @category.destroy! : DeleteCategoryService.process(
      params[:new_category_id],
      @category)
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

    def category_params
      params.require(:category).permit(:title)
    end

    def search_categories
      @categories = current_user.categories.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
    end
end
