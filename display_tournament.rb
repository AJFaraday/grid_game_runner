require 'csv'
require 'erb'

matches = []
CSV.foreach('data/matches.csv', col_sep: "\t", headers: true) do |row|
  matches << row.to_hash
end

rankings = []
CSV.foreach('data/rankings.csv', col_sep: "\t", headers: true) do |row|
rankings << row.to_hash
end

template = File.open('views/simple_rankings.html.erb', 'rb', &:read)
File.write('html/simple_rankings.html', ERB.new(template).result)

template = File.open('views/rankings.html.erb', 'rb', &:read)
File.write('html/rankings.html', ERB.new(template).result)

template = File.open('views/matches.html.erb', 'rb', &:read)
File.write('html/matches.html', ERB.new(template).result)

rankings.each do |ranking|
  @bot = ranking['Bot']
  @gist = ranking['Gist']
  template = File.open('views/bot.html.erb', 'rb', &:read)
  File.write("html/bot_#{@gist}.html", ERB.new(template).result)
end