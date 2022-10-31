# frozen_string_literal: true

require "test_helper"

class Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @article = create(:article)
    @headers = headers(@article.preference)
  end
end
