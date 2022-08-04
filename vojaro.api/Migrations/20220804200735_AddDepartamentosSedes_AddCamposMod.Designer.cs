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
    [Migration("20220804200735_AddDepartamentosSedes_AddCamposMod")]
    partial class AddDepartamentosSedes_AddCamposMod
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.13");

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

            modelBuilder.Entity("vojaro.domain.Universidad", b =>
                {
                    b.Navigation("Departamentos");

                    b.Navigation("Sedes");
                });
#pragma warning restore 612, 618
        }
    }
}
