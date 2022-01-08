/****** Object:  Table [dbo].[Users]    Script Date: 09/01/2022 00:00:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[uPassword] [varchar](256) NOT NULL,
 CONSTRAINT [PK__Users__CB9A1CDF2BFFD417] PRIMARY KEY CLUSTERED 
(
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

