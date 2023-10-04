-- DropForeignKey
ALTER TABLE `alocacao` DROP FOREIGN KEY `automovelId`;

-- DropForeignKey
ALTER TABLE `alocacao` DROP FOREIGN KEY `concessionariaId`;

-- CreateTable
CREATE TABLE `Vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `alocacaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_automovelId_fkey` FOREIGN KEY (`automovelId`) REFERENCES `Automoveis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_concessionariaId_fkey` FOREIGN KEY (`concessionariaId`) REFERENCES `Concessionarias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_alocacaoId_fkey` FOREIGN KEY (`alocacaoId`) REFERENCES `Alocacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
