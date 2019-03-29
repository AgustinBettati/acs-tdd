name := "play-java-ebean-example"

version := "1.0.0-SNAPSHOT"

scalaVersion := "2.12.8"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

libraryDependencies += guice
libraryDependencies += jdbc
libraryDependencies += evolutions
libraryDependencies += "com.h2database" % "h2" % "1.4.197"

libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.9.8"

libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test
libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.mockito" % "mockito-core" % "2.1.0" % Test
libraryDependencies += "io.ebean.test" % "ebean-test-config" % "11.17.1" % Test

testOptions in Test += Tests.Argument(TestFrameworks.JUnit, "-a", "-v")

javacOptions ++= Seq("-Xlint:unchecked", "-Xlint:deprecation", "-Werror")
