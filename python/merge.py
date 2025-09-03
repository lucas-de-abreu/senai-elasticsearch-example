import pandas as pd

movies = "./dataset/movies.csv"
posters = "./dataset/posters.csv"
output = "./dataset/output.csv"

df1 = pd.read_csv(movies, nrows=2000)

df2 = pd.read_csv(posters, nrows=2000)

merged_df = pd.merge(df1, df2, on="id", how="inner")

merged_df.to_csv(output, index=False)
