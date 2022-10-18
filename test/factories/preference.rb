# frozen_string_literal: true

FactoryBot.define do
  factory :preference do
    name { Faker::Name.name[0..14] }
    password { "welcome123" }
  end
end
