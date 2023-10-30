﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using vojaro.data;

namespace vojaro.api.Migrations
{
    [DbContext(typeof(VojaroDbContext))]
    [Migration("20231030024706_AlterAsignaturas")]
    partial class AlterAsignaturas
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.13");

            modelBuilder.Entity("vojaro.domain.Asignatura", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int>("Anio")
                        .HasColumnType("int");

                    b.Property<int>("CargaHoraria")
                        .HasColumnType("int");

                    b.Property<long>("CarreraId")
                        .HasColumnType("bigint");

                    b.Property<long?>("CarreraOrientacionId")
                        .HasColumnType("bigint");

                    b.Property<string>("Codigo")
                        .HasColumnType("longtext");

                    b.Property<int>("Creditos")
                        .HasColumnType("int");

                    b.Property<int>("Cuatrimestre")
                        .HasColumnType("int");

                    b.Property<bool>("EsInterdisciplinaria")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CarreraId");

                    b.HasIndex("CarreraOrientacionId");

                    b.ToTable("asignaturas");
                });

            modelBuilder.Entity("vojaro.domain.AsignaturaCorrelativa", b =>
                {
                    b.Property<long>("AsignaturaId")
                        .HasColumnType("bigint");

                    b.Property<long>("CorrelativaId")
                        .HasColumnType("bigint");

                    b.HasKey("AsignaturaId", "CorrelativaId");

                    b.HasIndex("CorrelativaId");

                    b.ToTable("asignaturas_correlativas");
                });

            modelBuilder.Entity("vojaro.domain.Carrera", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long?>("DepartamentoId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long?>("UniversidadId")
                        .HasColumnType("bigint");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("UniversidadId");

                    b.ToTable("carreras");
                });

            modelBuilder.Entity("vojaro.domain.CarreraOrientacion", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("CarreraId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CarreraId");

                    b.ToTable("carreras_orientaciones");
                });

            modelBuilder.Entity("vojaro.domain.Correlativa", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("AsignaturaId")
                        .HasColumnType("bigint");

                    b.Property<int>("Condicion")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("correlativas");
                });

            modelBuilder.Entity("vojaro.domain.Departamento", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("UniversidadId")
                        .HasColumnType("bigint");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UniversidadId");

                    b.ToTable("departamentos");
                });

            modelBuilder.Entity("vojaro.domain.Sede", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("UniversidadId")
                        .HasColumnType("bigint");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UniversidadId");

                    b.ToTable("sedes");
                });

            modelBuilder.Entity("vojaro.domain.Universidad", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FechaUltimaModificacion")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Siglas")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.Property<long?>("UsuarioUltimaModificacion")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("universidades");
                });

            modelBuilder.Entity("vojaro.domain.Asignatura", b =>
                {
                    b.HasOne("vojaro.domain.Carrera", "Carrera")
                        .WithMany("Asignaturas")
                        .HasForeignKey("CarreraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("vojaro.domain.CarreraOrientacion", "CarreraOrientacion")
                        .WithMany("Asignaturas")
                        .HasForeignKey("CarreraOrientacionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Carrera");

                    b.Navigation("CarreraOrientacion");
                });

            modelBuilder.Entity("vojaro.domain.AsignaturaCorrelativa", b =>
                {
                    b.HasOne("vojaro.domain.Asignatura", "Asignatura")
                        .WithMany("AsignaturaCorrelativas")
                        .HasForeignKey("AsignaturaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("vojaro.domain.Correlativa", "Correlativa")
                        .WithMany("AsignaturaCorrelativas")
                        .HasForeignKey("CorrelativaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asignatura");

                    b.Navigation("Correlativa");
                });

            modelBuilder.Entity("vojaro.domain.Carrera", b =>
                {
                    b.HasOne("vojaro.domain.Departamento", "Departamento")
                        .WithMany("Carreras")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("vojaro.domain.Universidad", "Universidad")
                        .WithMany("Carreras")
                        .HasForeignKey("UniversidadId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Departamento");

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("vojaro.domain.CarreraOrientacion", b =>
                {
                    b.HasOne("vojaro.domain.Carrera", "Carrera")
                        .WithMany("Orientaciones")
                        .HasForeignKey("CarreraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Carrera");
                });

            modelBuilder.Entity("vojaro.domain.Departamento", b =>
                {
                    b.HasOne("vojaro.domain.Universidad", "Universidad")
                        .WithMany("Departamentos")
                        .HasForeignKey("UniversidadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("vojaro.domain.Sede", b =>
                {
                    b.HasOne("vojaro.domain.Universidad", "Universidad")
                        .WithMany("Sedes")
                        .HasForeignKey("UniversidadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("vojaro.domain.Asignatura", b =>
                {
                    b.Navigation("AsignaturaCorrelativas");
                });

            modelBuilder.Entity("vojaro.domain.Carrera", b =>
                {
                    b.Navigation("Asignaturas");

                    b.Navigation("Orientaciones");
                });

            modelBuilder.Entity("vojaro.domain.CarreraOrientacion", b =>
                {
                    b.Navigation("Asignaturas");
                });

            modelBuilder.Entity("vojaro.domain.Correlativa", b =>
                {
                    b.Navigation("AsignaturaCorrelativas");
                });

            modelBuilder.Entity("vojaro.domain.Departamento", b =>
                {
                    b.Navigation("Carreras");
                });

            modelBuilder.Entity("vojaro.domain.Universidad", b =>
                {
                    b.Navigation("Carreras");

                    b.Navigation("Departamentos");

                    b.Navigation("Sedes");
                });
#pragma warning restore 612, 618
        }
    }
}
