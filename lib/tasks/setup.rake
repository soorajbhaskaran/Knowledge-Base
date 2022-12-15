desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_with_sample_data: [:environment] do
  Seeder::SeederService.new.process!
  puts "Sample data has been added."
end
