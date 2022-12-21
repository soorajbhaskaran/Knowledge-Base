# frozen_string_literal: true

class DeleteCategoryService < ApplicationService
  attr_accessor :category_id, :category

  def initialize(category_id, category)
    @category_id = category_id
    @category = category
  end

  def process
    delete_category!
  end

  private

    def delete_category!
      return category.destroy! if category.articles_count.zero?

      delete_category_with_articles!
    end

    def delete_category_with_articles!
      new_category_id = create_new_category_if_there_is_only_one
      category.articles.update_all(category_id: new_category_id)
      Category.update_counters(new_category_id, articles_count: category.articles_count)
      category.reload.destroy!
    end

    def create_new_category_if_there_is_only_one
      if current_user.categories.count == 1
        current_user.categories.create!(title: "General")
        return current_user.categories.where(title: "General").first.id
      end
      category_id
    end
end
