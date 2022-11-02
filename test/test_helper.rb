# frozen_string_literal: true

def enable_test_coverage
  require "simplecov"
  SimpleCov.start do
    add_filter "/test/"
    add_group "Models", "app/models"
    add_group "Controllers", "app/controllers"
  end
end

def headers(options = {})
  {
    Accept: "application/json",
    "Content_Type" => "application/json"
  }.merge(options)
end

enable_test_coverage if ENV["COVERAGE"]

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include ActionView::Helpers::TranslationHelper
  include FactoryBot::Syntax::Methods

  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors) unless ENV["COVERAGE"]

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  # fixtures :all

  # Add more helper methods to be used by all tests here...
end
