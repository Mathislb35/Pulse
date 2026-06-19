import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau message' })
  @ApiResponse({ status: 201, description: 'Message créé avec succès' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les messages' })
  @ApiResponse({ status: 200, description: 'Liste des messages récupérée avec succès' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un message par son identifiant' })
  @ApiResponse({ status: 200, description: 'Message récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Message non trouvé' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un message' })
  @ApiResponse({ status: 200, description: 'Message mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Message non trouvé' })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un message' })
  @ApiResponse({ status: 200, description: 'Message supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Message non trouvé' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
