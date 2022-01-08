/****** Object:  Table [dbo].[Transactions]    Script Date: 09/01/2022 00:00:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Transactions](
	[id] [int] IDENTITY(1642,1) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[tDate] [date] NOT NULL,
	[amount] [float] NOT NULL,
	[category] [nvarchar](50) NOT NULL,
	[subCategory] [nvarchar](50) NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

