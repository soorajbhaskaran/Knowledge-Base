# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_path { Faker::Name.name }
    to_path { Faker::Name.name }
  end
end
