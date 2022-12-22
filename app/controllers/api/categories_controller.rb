# frozen_string_literal: true

class API::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = current_user.categories.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
  end

  def create
    current_user.categories.create! category_params
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update! category_params
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    delete_category_service = DeleteCategoryService.new(params[:new_category_id], @category)
    delete_category_service.process
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def sort
    params[:categories].each_with_index do |category, index|
      current_user.categories.find(category[:id]).update! position: index + 1
    end
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:title)
    end
end
